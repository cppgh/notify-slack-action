const github = require('@actions/github');

module.exports = async function notifySlack(core) {
    const slackWebhookUrl = core.getInput('slack-webhook-url');
    const eventPayload = github.context.payload;
    eventPayload.repository.name;
    const message = `
        On *${eventPayload.repository.name}* ran *${github.context.workflow}* (${eventPayload.pull_request.title}) for ${github.event.head_commit.author.name || github.context.actor}: ${github.context.job.status} [<${github.context.serverUrl}/${github.context.repo}/actions/runs/${github.context.runId}|result>]
    `;
    core.setOutput('message', message);
};
