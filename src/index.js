const core = require('@actions/core');
const github = require('@actions/github');

const slackWebhookUrl = core.getInput('slack-webhook-url');
const eventPayload = github.context.payload;
const pullRequest = eventPayload.pull_request;
const pullRequestTitle = pullRequest && pullRequest.title;
const headCommit = eventPayload.head_commit;
const headCommitAuthor = headCommit && headCommit.author.name;
const headCommitMessage = headCommit && headCommit.message;

const message = `
    On *${eventPayload.repository.name}* ran *${github.context.workflow}* (${pullRequestTitle || headCommitMessage}) for ${headCommitAuthor}: JOB_STATUS [<${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/actions/runs/${github.context.runId}|result>]
`;
console.log(github.context);
core.setOutput('message', message);
