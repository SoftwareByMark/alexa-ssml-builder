// Copyright 2017 Mark Borner
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const assert = require('assert');
const AlexaSsmlBuilder = require('../lib/alexa-ssml-builder');

describe('SSML Builder', function() {

    describe('Parent Prototype Method', function () {
        it('should execute successfully', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            const result = ssmlBuilder.build();
            const expectedResult = "<speak></speak>";
            assert.equal(result, expectedResult);
        });
    });

    describe('Audio with valid url', function () {
        it('should correctly format the SSML', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            ssmlBuilder.playAudio("https://www.host.com/audio.mp3");
            const result = ssmlBuilder.build();
            const expectedResult = "<speak><audio src=\"https://www.host.com/audio.mp3\"/></speak>";
            assert.equal(result, expectedResult);
        });
    });

    describe('Audio with http url', function () {
        it('should throw a Error', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            assert.throws(function () {
                ssmlBuilder.playAudio("http://www.host.com/audio.mp3");
            }, Error);
        });
    });

    describe('Audio with non-mp3 url', function () {
        it('should throw a Error', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            assert.throws(function () {
                ssmlBuilder.playAudio("https://www.host.com/audio.wav");
            }, Error);
        });
    });

    describe('Start Language', function () {
        it('should throw an Error', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            assert.throws(function () {
                ssmlBuilder.startLanguage("foo");
            }, Error);
        });
    });

    describe('End Language', function () {
        it('should throw an Error', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            assert.throws(function () {
                ssmlBuilder.endLanguage("foo");
            }, Error);
        });
    });

    describe('Speak with Language', function () {
        it('should throw an Error', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            assert.throws(function () {
                ssmlBuilder.speakWithLanguage("text", "foo");
            }, Error);
        });
    });

    describe('Speak with Rate constant', function () {
        it('should correctly format the SSML', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            ssmlBuilder.speakWithRate("I can speak slowly", ssmlBuilder.RATE_XTRA_SLOW);
            const result = ssmlBuilder.build();
            const expectedResult = "<speak><prosody rate=\"x-slow\">I can speak slowly</prosody></speak>";
            assert.equal(result, expectedResult);
        });
    });

    describe('Speak with Rate string', function () {
        it('should correctly format the SSML', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            ssmlBuilder.speakWithRate("I can speak slowly", "50%");
            const result = ssmlBuilder.build();
            const expectedResult = "<speak><prosody rate=\"50%\">I can speak slowly</prosody></speak>";
            assert.equal(result, expectedResult);
        });
    });

    describe('Speak with invalid Rate string', function () {
        it('should throw a TypeError', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            assert.throws(function () {
                ssmlBuilder.speakWithRate("I can speak slowly", "50");
            }, TypeError)
        });
    });

    describe('Speak with volume constant', function () {
        it('should properly format the SSML', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            ssmlBuilder.speakWithVolume("Speak this quite a bit louder.", ssmlBuilder.VOLUME_XTRA_LOUD)
                .speak("This is normal.");
            const result = ssmlBuilder.build();
            const expectedResult = '<speak><prosody volume="x-loud">Speak this quite a bit louder.</prosody>This is normal.</speak>';
            assert.equal(result, expectedResult);
        });
    });

    describe('Speak with default volume constant', function () {
        it('should throw a TypeError', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            assert.throws(function () {
                ssmlBuilder.speakWithVolume("Speak this quite a bit louder.", ssmlBuilder.VOLUME_DEFAULT);
            }, TypeError);
        });
    });

    describe('Speak with pitch constant', function () {
        it('should properly format the SSML', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            ssmlBuilder.speakWithPitch("Speak this quite a bit lower.", ssmlBuilder.PITCH_XTRA_LOW);
            const result = ssmlBuilder.build();
            const expectedResult = '<speak><prosody pitch="x-low">Speak this quite a bit lower.</prosody></speak>';
            assert.equal(result, expectedResult);
        });
    });

    describe('Speak with default pitch constant', function () {
        it('should throw a TypeError', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            assert.throws(function () {
                ssmlBuilder.speakWithPitch("Speak this quite a bit lower.", ssmlBuilder.PITCH_DEFAULT);
            }, TypeError);
        });
    });

    describe('Speak with emphasis constant', function () {
        it('should properly format the SSML', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            ssmlBuilder.speakWithEmphasis("Speak this with some emphasis.", ssmlBuilder.EMPHASIS_STRONG);
            const result = ssmlBuilder.build();
            const expectedResult = '<speak><emphasis level="strong">Speak this with some emphasis.</emphasis></speak>';
            assert.equal(result, expectedResult);
        });
    });

    describe('Speak with invalid emphasis', function () {
        it('should throw a TypeError', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            assert.throws(function () {
                ssmlBuilder.speakWithEmphasis("Speak this with some emphasis.", "foo");
            }, TypeError);
        });
    });

    describe('Speak with speechcon', function () {
        it('should properly format the SSML', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            ssmlBuilder.speakWithSpeechcon("bingo");
            const result = ssmlBuilder.build();
            const expectedResult = '<speak><say-as interpret-as="interjection">bingo</say-as></speak>';
            assert.equal(result, expectedResult);
        });
    });

    describe('Speak as with type constant', function () {
        it('should properly format the SSML', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            ssmlBuilder.speak("Richard's number is ")
                .speakAs("2122241555", ssmlBuilder.INTERPRET_AS_TELEPHONE);
            const result = ssmlBuilder.build();
            const expectedResult = "<speak>Richard's number is <say-as interpret-as=\"telephone\">2122241555</say-as></speak>";
            assert.equal(result, expectedResult);
        });
    });

    describe('Speak as with invalid type constant', function () {
        it('should throw a Type Error', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            assert.throws(function () {
                ssmlBuilder.speakAs("2122241555", "foo");
            }, TypeError);
        });
    });

    describe('Speak as role', function () {
        it('should properly format the SSML', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            ssmlBuilder.speak("The present simple form of the word is pronounced ")
                .speakWithRole("read", ssmlBuilder.ROLE_VERB)
                .speak(", where the past tense or past participle is pronounced ")
                .speakWithRole("read", ssmlBuilder.ROLE_PAST_TENSE);
            const result = ssmlBuilder.build();
            const expectedResult = "<speak>" +
                "The present simple form of the word is pronounced <w role=\"amazon:VB\">read</w>, " +
                "where the past tense or past participle is pronounced <w role=\"amazon:VBD\">read</w>" +
                "</speak>";
            assert.equal(result, expectedResult);
        });
    });

    describe('Speak as role noun', function () {
        it('should properly format the SSML', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            ssmlBuilder.speak("The ")
                .speakWithRole("run", ssmlBuilder.ROLE_NOUN)
                .speak(" was 5 kilometers.");
            const result = ssmlBuilder.build();
            const expectedResult = "<speak>" +
                "The <w role=\"amazon:NN\">run</w> " +
                "was 5 kilometers." +
                "</speak>";
            assert.equal(result, expectedResult);
        });
    });

    describe('Speak as invalid role', function () {
        it('should throw a TypeError', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            assert.throws(function () {
                ssmlBuilder.speakWithRole("read", "past");
            }, TypeError);
        });
    });

    describe('Speak with Prosody', function () {
        it('should properly format the SSML', function () {
            const ssmlBuilder = new AlexaSsmlBuilder();
            ssmlBuilder.speakWithProsody("Say this is a weird voice.", ssmlBuilder.VOLUME_XTRA_SOFT, ssmlBuilder.PITCH_LOW, ssmlBuilder.RATE_XTRA_SLOW)
                .speak("This is normal.");
            const result = ssmlBuilder.build();
            const expectedResult = '<speak><prosody volume="x-soft" pitch="low" rate="x-slow">Say this is a weird voice.</prosody>This is normal.</speak>';
            assert.equal(result, expectedResult);
        });
    });


});