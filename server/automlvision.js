// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

const automl = require('@google-cloud/automl').v1beta1;
  const fs = require('fs');

  // Create client for prediction service.
  const client = new automl.PredictionServiceClient();

  const projectId = port.PROJECT_ID;
  const computeRegion = port.COMPUTE_REGION;
  const modelId = port.MODEL_ID;
  // const filePath = port.FILE_PATH;
  // const scoreThreshold = '0.5';

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // Read the file content for prediction.
  const content = fs.readFileSync(filePath, 'base64');

  const params = {};

  // if (scoreThreshold) {
  //   params.scoreThreshold = scoreThreshold;
  // }

  // Set the payload by giving the content and type of the file.
  const payload = {};
  payload.image = {imageBytes: content};

  // params is additional domain-specific parameters.
  // currently there is no additional parameters supported.
  client
    .predict({name: modelFullId, payload: payload, params: params})
    .then(responses => {
      console.log(`Prediction results:`);
      responses[0].payload.forEach(result => {
        console.log(`Predicted class name: ${result.displayName}`);
        console.log(`Predicted class score: ${result.classification.score}`);
      });
    })
    .catch(err => {
      console.error(err);
    });