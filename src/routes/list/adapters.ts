import { createEntityAdapter } from "@reduxjs/toolkit";
import { AppState } from "reducer";
import { Term } from "types/Term";

export const termAdapter = createEntityAdapter<Term>({
  selectId: (term) => term.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  termAdapter.getSelectors<AppState>((s) => s.dictionary);
