# Alexa SSML Builder

A utility for building valid SSML for use with Amazon Web Services [Alexa](https://aws.amazon.com/alexa/) service.

Amazon Alexa supports a subset of the SSML markup tags as defined by [Speech Synthesis Markup Language (SSML) Version 1.1, W3C Recommendation](https://www.w3.org/TR/2010/REC-speech-synthesis11-20100907/).

Using a [Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern), the AlexaSsmlBuilder class allows you to programmatically build up a valid SSML string.

This is an extension of [PollySsmlBuilder](https://github.com/SoftwareByMark/polly-ssml-builder).

## Install

```
npm install alexa-ssml-builder
```

### Usage

Start by requiring the library.

```javascript
const AlexaSsmlBuilder = require("alexa-ssml-builder");
```

Then, for each SSML String you want to create, do the following:

* create a new AlexaSsmlBuilder
* call methods to speak text
* build the String result

```javascript
let alexaSsmlBuilder = new AlexaSsmlBuilder();
let ssml = alexaSsmlBuilder.speak("Don't tell anyone, but ")
    .whisper("I see dead people.")
    .build();
```

This produces the following String:

```text
<speak>Don't tell anyone, but <amazon:effect name="whispered">I see dead people.</amazon:effect></speak>
```

All options are available as constants on the AlexaSsmlBuilder class.  For example:

```javascript
let alexaSsmlBuilder = new AlexaSsmlBuilder();
let ssml = alexaSsmlBuilder.speakPhonetically("pecan", alexaSsmlBuilder.ALPHABET_IPA, "pɪˈkɑːn")
    .build();
```

AlexaSsmlBuilder.ALPHABET_IPA specifies the "ipa" language.

### Break

To add a break (pause) into the speech, call addBreak().

```javascript
let alexaSsmlBuilder = new AlexaSsmlBuilder();
let ssml = alexaSsmlBuilder.speak("Legen - wait for it.")
    .addBreak(alexaSsmlBuilder.BREAK_STRONG)
    .speak("dary")
    .build();
```

The duration parameter can be one of the following:

* The number of seconds specified as "10s" for 10 seconds 
* The number of milliseconds specified as "500ms" for 500 milliseconds
* One of the BREAK_* constants 

### Speak with Emphasis

To change the emphasis of speech, call speakWithEmphasis().

```javascript
let alexaSsmlBuilder = new AlexaSsmlBuilder();
let ssml = alexaSsmlBuilder.speakWithEmphasis("I'm speaking with emphasis!", alexaSsmlBuilder.EMPHASIS_STRONG)
    .build();
```

The level parameter can be one of the EMPHASIS_* constants.

### Speak with Volume

To change the volume of speech, call speakWithVolume().

```javascript
let alexaSsmlBuilder = new AlexaSsmlBuilder();
let ssml = alexaSsmlBuilder.speakWithVolume("I'm shouting!", alexaSsmlBuilder.VOLUME_XTRA_LOUD)
    .build();
```

The volume parameter can be one of the following:

* An increase in volume as "+5dB" will increase the volume by 5 decibels
* A decrease in volume as "-3dB" will decrease the volume by 3 decibels
* One of the VOLUME_* constants 

### Speak with Rate

To change the rate of speech, call speakWithRate().

```javascript
let alexaSsmlBuilder = new AlexaSsmlBuilder();
let ssml = alexaSsmlBuilder.speakWithRate("I'm speeking fast!", alexaSsmlBuilder.RATE_FAST)
    .build();
```

The rate parameter can be one of the following:

* A percent rate over 100% as "150%" will increase the rate by 50 percent
* A percent rate under 100% as "50%" will decrease the rate by 50 percent
* One of the RATE_* constants 

### Speak with Pitch

To change the pitch of speech, call speakWithPitch().

```javascript
let alexaSsmlBuilder = new AlexaSsmlBuilder();
let ssml = alexaSsmlBuilder.speakWithPitch("I'm speaking with a high voice!", alexaSsmlBuilder.PITCH_HIGH)
    .build();
```

The pitch parameter can be one of the following:

* A percent increase in pitch as "+7%" will increase the pitch by 7 percent
* A percent decrease in pitch as "-5%" will decrease the pitch by 5 percent
* One of the PITCH_* constants 

### Speechcons

Alexa supports speechcons!

```javascript
let alexaSsmlBuilder = new AlexaSsmlBuilder();
let ssml = alexaSsmlBuilder.speakWithSpeechcon("bingo")
    .build();
```

The text to speak is not validated as a valid speechcon.  This is because the list
of speechcons depends upon the language of the request.  And the list of valid speechcon may
change over time.

Here are the lists of valid speechons:

* [English US](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference)
* [English UK](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference-uk)
* [German](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference-de)

### Paragraphs

Paragraphs can be spoken with one method call:

```javascript
let alexaSsmlBuilder = new AlexaSsmlBuilder();
let ssml = alexaSsmlBuilder.speakWithParagraph("The quick brown fox jumped over the lazy dog.  It is a sentence that contains all the letters of the alphabet.")
    .build();
```

Or with multiple methods calls:

```javascript
let replyBuilder = new AlexaSsmlBuilder();
let ssml = alexaSsmlBuilder.startParagraph()
    .speak("The quick brown fox jumped over the lazy dog.  ")
    .speak("It is a sentence that contains all the letters of the alphabet.")
    .endParagraph()
    .build();
```

Both of these options produce the same result.

If you forget to call endParagraph() before you build(), an Error will be thrown.

### Sentences

Sentences work similar to paragraphs - they can be spoken with one method call, or multiple method calls.

### Languages

Alexa does not (yet) support speaking in languages.  Calling any of these methods will throw an error:
* startLanguage()
* endLanguage()
* speakWithLanguage()

### Mark

Alexa does not (yet) support adding a mark to the SSML.  Calling this method will throw an error:
* mark()

### Supported Tags

For a full list of supported SSML tags, see [Supported SSML Tags](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference#ssml-supported)

All tags listed as of July 2017 are supported by this builder.

## Authors

* **Mark Borner** - *Initial work* - [Software By Mark](https://github.com/softwarebymark)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.txt](LICENSE.txt) file for details

