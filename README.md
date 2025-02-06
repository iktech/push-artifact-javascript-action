# Push Artifact Javascript Action

This action pushes the artifact version to the next stage of the flow at the https://artifactz.io.
If version is omitted, then current version from the specified stage is getting pushed

## Inputs
### `serviceUrl`
**Required** The URL of the artifactz.io service. 
*Default:* https://api.artifactz.io

### `apiToken`
**Required** The API token with write permissions 

### `stage`
**Required** Stage where artifact is getting pushed from

### `name`
**Required** Name of the artifact to push

### `version`
The artifact version to push

## Outputs
### `version`
The version of the artifact that was pushed

## Example
Before adding this action to your workflow, set a secret with the API token in your project.
Then, you can push the artifact details using this step:
```yaml
- name: Push Artifact
  uses: iktech/push-artifact-javascript-action@v1.0.0
  with:
    apiToken: ${{ secrets.ARTIFACTZ_TOKEN }}
    stage: Development
    name: test
```
