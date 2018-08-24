# Neural Attention in Keras

This repository contains a notebook with some simple prototypes to add
an attention mechanism to an LSTM for sequence labeling. It is part of a
presentation for the Tensorflow Meetup Buenos Aires, in June 2018.

We also add some scripts to visualize the attention obtained after training for
the Named Entity Recognition task in a portion of the 2003 CONLL dataset.

## Data

The [original dataset](https://www.kaggle.com/gagandeep16/ner-using-bidirectional-lstm) was uploaded to Kaggle, along with a vanilla LSTM implementation. We have also hosted it into the UNC servers:

* [Full dataset](https://cs.famaf.unc.edu.ar/~mteruel/datasets/tensorflowMeetup/ner.csv) (150M)
* [Sample dataset](https://cs.famaf.unc.edu.ar/~mteruel/datasets/tensorflowMeetup/ner.sample.csv) (14M)

There are also some trained models you can download, as it takes some time to train in the whole dataset even using a GPU:

* [Without attention](https://cs.famaf.unc.edu.ar/~mteruel/datasets/tensorflowMeetup/model_10ep.keras)
* [With attention - Model 1](https://cs.famaf.unc.edu.ar/~mteruel/datasets/tensorflowMeetup/model_10ep_att_softmax.keras)
* [With attention - Model 1 - Linear](https://cs.famaf.unc.edu.ar/~mteruel/datasets/tensorflowMeetup/model_10ep_att_linear.keras)
* [With attention - Model 2](https://cs.famaf.unc.edu.ar/~mteruel/datasets/tensorflowMeetup/model_10ep_att2_softmax.keras)
* [With attention - Model 2 - Linear](https://cs.famaf.unc.edu.ar/~mteruel/datasets/tensorflowMeetup/model_10ep_att2_linear.keras)


## Requirements

To run the network, we recommend you to use python 3.5 and install

* Keras 2.1.5
* scikit-learn 0.19.1
* pandas 0.23.0

