import { FindTermsResult, HttpTermsApi } from '@/services/http-terms-api';
import { Storage } from '@/services/Storage';
import { IndexedDbTermsRepository } from '@/services/terms';

export class SynchronizerService {
  constructor(
    private readonly httpTermsApi: HttpTermsApi,
    private readonly indexedDbTermsApi: IndexedDbTermsRepository,
    private readonly lastUpdateSyncedFromServerStorage: Storage<Date | undefined>,
  ) {}

  async synchronize(signal: AbortSignal) {
    const oldLastUpdateAtFromServer = await this.lastUpdateSyncedFromServerStorage.get();
    await this.synchronizeToServer(oldLastUpdateAtFromServer, signal);
    const newLastUpdateAtFromServer = await this.synchronizeFromServer(oldLastUpdateAtFromServer, signal);
    await this.lastUpdateSyncedFromServerStorage.set(
      newLastUpdateAtFromServer ?? oldLastUpdateAtFromServer ?? new Date(),
    );
  }

  private async synchronizeFromServer(lastSyncedUpdateAt: Date | undefined, signal: AbortSignal) {
    let page = 1;
    let result: FindTermsResult;

    let newLastSyncedUpdateAt: Date | undefined;
    do {
      signal.throwIfAborted();

      result = await this.httpTermsApi.find(
        {
          page,
          sortBy: ['updatedAt:ASC'],
          filter: {
            updatedAt: `$gt:${lastSyncedUpdateAt?.toISOString() ?? '1970-01-01T00:00:00.000Z'}`,
          },
        },
        signal,
      );

      for (const serverTerm of result.data) {
        signal.throwIfAborted();

        const localTerm = await this.indexedDbTermsApi.getByServerId(serverTerm._id);

        signal.throwIfAborted();

        if (!localTerm) {
          await this.indexedDbTermsApi.create({
            answersCount: serverTerm.answersCount,
            correctAnswersCount: serverTerm.correctAnswersCount,
            definition: serverTerm.definition,
            partOfSpeech: serverTerm.partOfSpeech,
            tags: serverTerm.tags,
            translation: serverTerm.translation,
            word: serverTerm.word,
            createdAt: new Date(serverTerm.updatedAt),
            updatedAt: new Date(serverTerm.updatedAt),
            serverId: serverTerm._id,
          });
        } else if (localTerm.updatedAt < new Date(serverTerm.updatedAt)) {
          await this.indexedDbTermsApi.update({
            ...localTerm,
            ...serverTerm,
            id: localTerm.id,
            serverId: serverTerm._id,
            createdAt: localTerm.createdAt,
            updatedAt: new Date(serverTerm.updatedAt),
          });
        } else if (localTerm.updatedAt > new Date(serverTerm.updatedAt)) {
          await this.httpTermsApi.patch(serverTerm._id, localTerm, signal);
        }
        newLastSyncedUpdateAt = new Date(serverTerm.updatedAt);
      }

      page += 1;
    } while (page <= result.meta.totalPages);

    return newLastSyncedUpdateAt;
  }

  private async synchronizeToServer(lastSyncedUpdateAt: Date | undefined, signal: AbortSignal) {
    await this.synchronizeCreatedLocally(signal);
    await this.synchronizeUpdatedLocally(lastSyncedUpdateAt, signal);
  }

  private async synchronizeCreatedLocally(signal: AbortSignal) {
    signal.throwIfAborted();

    console.log('Synchronizing locally created terms');

    const count = await this.indexedDbTermsApi.getWithoutServerIdCursor().count();

    console.log(`Found ${count} locally created terms`);

    for (let i = 1; i <= count; i += 1) {
      signal.throwIfAborted();

      console.log(`Synchronizing item ${i} of ${count}`);

      const locallyCreatedTerm = await this.indexedDbTermsApi.getWithoutServerIdCursor().first();

      signal.throwIfAborted();

      if (!locallyCreatedTerm) throw new Error(`Expected to find locally created term ${i} of ${count} but found none`);

      const serverTerm = await this.httpTermsApi.create(locallyCreatedTerm, signal);

      signal.throwIfAborted();

      await this.indexedDbTermsApi.update({
        ...locallyCreatedTerm,
        serverId: serverTerm._id,
      });
    }
  }

  private async synchronizeUpdatedLocally(lastSyncedUpdateAt: Date | undefined, signal: AbortSignal) {
    const startOfSync = new Date();

    signal.throwIfAborted();

    const count = await this.indexedDbTermsApi
      .getUpdatedLocally({
        from: lastSyncedUpdateAt ?? new Date(0),
        to: startOfSync,
      })
      .count();

    console.log(`Found ${count} locally updated terms`);

    for (let i = 1; i <= count; i += 1) {
      signal.throwIfAborted();

      console.log(`Synchronizing item ${i} of ${count}`);

      const locallyUpdatedTerm = await this.indexedDbTermsApi
        .getUpdatedLocally({
          from: lastSyncedUpdateAt ?? new Date(0),
          to: startOfSync,
        })
        .first();

      if (!locallyUpdatedTerm) throw new Error(`Expected to find locally updated term ${i} of ${count} but found none`);
      if (!locallyUpdatedTerm.serverId) throw new Error(`Term ${locallyUpdatedTerm.id} has no serverId`);

      const updatedRemoteTerm = await this.httpTermsApi.patch(locallyUpdatedTerm.serverId, locallyUpdatedTerm, signal);

      signal.throwIfAborted();

      await this.indexedDbTermsApi.update({
        ...locallyUpdatedTerm,
        ...updatedRemoteTerm,
        updatedAt: new Date(),
        createdAt: new Date(updatedRemoteTerm.createdAt),
      });
    }
  }
}
