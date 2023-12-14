
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace Vocabulary.Authentication.GitHub;

public class GitHubAuthOptions : RemoteAuthenticationOptions
{
    public string ClientId { get; set; } = string.Empty;
    public string ClientSecret { get; set; } = string.Empty;

    public GitHubAuthOptions() : base()
    {
        CallbackPath = "/auth/github/callback";
    }
}

public class GitHubAuthHandler(
    IOptionsMonitor<GitHubAuthOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder
    ) : RemoteAuthenticationHandler<GitHubAuthOptions>(options, logger, encoder)
{
    protected override Task<HandleRequestResult> HandleRemoteAuthenticateAsync()
    {
        throw new NotImplementedException();
    }

    protected override Task HandleChallengeAsync(AuthenticationProperties properties)
    {
        throw new NotImplementedException();
    }
}