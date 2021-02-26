const core = require('@actions/core');
const axios = require('axios');

try {
    const serviceUrl = core.getInput('serviceUrl');
    const apiToken = core.getInput('apiToken');
    const stage = core.getInput('stage');
    const name = core.getInput('name');
    const version = core.getInput('version');

    if (!apiToken) {
        core.setFailed('API token is required');
    }

    if (!stage) {
        core.setFailed('Stage is required');
    }

    if (!name) {
        core.setFailed('Artifact name is required');
    }

    let payload = {
        stage_name: stage,
        artifact_name: name,
    };

    if (version) {
        payload = {
            ...payload,
            version,
        }
    }

    console.log(`Pushing artifact '${name}' from the stage '${stage}'`);
    if (version) {
        console.log(`Pushing version ${version}`);
    }

    axios.put(`${serviceUrl}/artifacts/push`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Push Artifact Github Action v1.0.0',
            'Authorization': `Bearer ${apiToken}`,
        }
    }).then(response => {
        if (response.status !== 200) {
            core.setFailed(`Cannot push artifact '${name}': ${response.data.message}`);
        } else {
            console.log(`Successfully pushed artifact '${name}' version: ${response.data.version}`);
            core.setOutput('version', response.data.version);
        }
    }).catch(error => {
        core.setFailed(error.response.data.error);
    });
} catch (error) {
    core.setFailed(error.message);
}
