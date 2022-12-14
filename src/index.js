const core = require('@actions/core');
const github = require('@actions/github');

const slackWebhookUrl = core.getInput('slack-webhook-url');
const eventPayload = github.context.payload;
const pullRequest = eventPayload.pull_request;
const pullRequestTitle = pullRequest && pullRequest.title;

const message = `
    On *${eventPayload.repository.name}* ran *${github.context.workflow}* (${pullRequestTitle}) for ${github.event.head_commit.author.name || github.context.actor}: ${github.context.job.status} [<${github.context.serverUrl}/${github.context.repo}/actions/runs/${github.context.runId}|result>]
`;
core.setOutput('message', message);
