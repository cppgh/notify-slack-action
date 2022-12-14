const core = require('@actions/core');
const github = require('@actions/github');

const slackWebhookUrl = core.getInput('slack-webhook-url');
const jobStatus = core.getInput('job-status');
const eventPayload = github.context.payload;
const pullRequest = eventPayload.pull_request;
const pullRequestTitle = pullRequest && pullRequest.title;
const headCommit = eventPayload.head_commit;
const headCommitAuthor = headCommit && headCommit.author.name;

// take the first line
const headCommitMessage = ((headCommit && headCommit.message) || '').split("\n")[0];

const message = `
    On *${eventPayload.repository.name}* ran *${github.context.workflow}*
    (${pullRequestTitle || headCommitMessage}) for ${headCommitAuthor}:
    ${jobStatus}
    [<${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/actions/runs/${github.context.runId}|result>]
`.replace("\n", ' ').replace(/ +/g, ' ');
console.log(github.context);
const payload = {
    text: `Build result for ${github.context.repo.repo}`,
    blocks: [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: message
            }
        }
    ]
};
core.setOutput('payload', JSON.stringify(payload));
