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

'use strict';

const PollySsmlBuilder = require("polly-ssml-builder");
const isString = require("lodash.isstring");

exports = module.exports = AlexaSsmlBuilder;

/**
 * Creates a new AlexaSsmlBuilder
 *
 * @constructor
 */
function AlexaSsmlBuilder() {
    PollySsmlBuilder.call(this);

    Object.defineProperty(this, "EMPHASIS_STRONG", { value: "strong", writable: false });
    Object.defineProperty(this, "EMPHASIS_MODERATE", { value: "moderate", writable: false });
    Object.defineProperty(this, "EMPHASIS_REDUCED", { value: "reduced", writable: false });
    Object.defineProperty(this, "EMPHASISES", { value: [
        this.EMPHASIS_STRONG,
        this.EMPHASIS_MODERATE,
        this.EMPHASIS_REDUCED
    ], writable: false });

    Object.defineProperty(this, "INTERPRET_AS_INTERJECTION", { value: "interjection", writable: false });
    Object.defineProperty(this, "ROLE_NOUN", { value: "amazon:NN", writable: false });

}

AlexaSsmlBuilder.prototype = Object.create(PollySsmlBuilder.prototype);
AlexaSsmlBuilder.prototype.constructor = AlexaSsmlBuilder;

/**
 * Plays an audio file
 *
 * @param url The URL of the audio file to play
 * @returns {AlexaSsmlBuilder}
 */
AlexaSsmlBuilder.prototype.playAudio = function(url) {
    if (!isString(url)) {
        throw new TypeError("Url should be a string");
    }
    if (!url.toLowerCase().startsWith("https://")) {
        throw new Error("Url must start with https://");
    }
    if (!url.endsWith(".mp3")) {
        throw new Error("Url must end with .mp3");
    }
    this.stringBuilder.append("<audio src=\"");
    this.stringBuilder.append(url);
    this.stringBuilder.append("\"/>");
    return this;
};

AlexaSsmlBuilder.prototype.startLanguage = function(language) {
    throw new Error("Alexa does not support the <lang> tag");
};

AlexaSsmlBuilder.prototype.endLanguage = function(language) {
    throw new Error("Alexa does not support the <lang> tag");
};

AlexaSsmlBuilder.prototype.speakWithLanguage = function(speech, language) {
    throw new Error("Alexa does not support the <lang> tag");
};

AlexaSsmlBuilder.prototype.mark = function(tagName) {
    throw new Error("Alexa does not support the <mark> tag");
};

/**
 * Speak the given text with the specified prosody
 *
 * @param speech The text to speak
 * @param volume The volume of the speech (see VOLUMES)
 * @param pitch The pitch of the speech (see PITCHES)
 * @param rate The rate of the speech (see RATES)
 * @returns {AlexaSsmlBuilder}
 */
AlexaSsmlBuilder.prototype.speakWithProsody = function(speech, volume, pitch, rate) {
    if (volume === this.VOLUME_DEFAULT) {
        throw new TypeError("Alexa does not support 'default' for the volume");
    }
    if (pitch === this.PITCH_DEFAULT) {
        throw new TypeError("Alexa does not support 'default' for the pitch");
    }
    return Object.getPrototypeOf(AlexaSsmlBuilder.prototype).speakWithProsody.call(this, speech, volume, pitch, rate);
};

/**
 * Speak with emphasis
 *
 * @param speech The text to speak
 * @param level The level of the emphasis (see EMPHASISES)
 * @returns {AlexaSsmlBuilder}
 */
AlexaSsmlBuilder.prototype.speakWithEmphasis = function (speech, level) {
    if (this.EMPHASISES.indexOf(level) === -1) {
        throw new TypeError("Level must be one of: " + this.EMPHASISES);
    }
    this.stringBuilder.append("<emphasis level=\"");
    this.stringBuilder.append(level);
    this.stringBuilder.append("\">");
    this.stringBuilder.append(speech);
    this.stringBuilder.append("</emphasis>");
    return this;
};

/**
 * Speak the given text as a speechcon
 *
 * @param speechcon The text to speak
 * @see <a href="https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference">English (US) Speechcons</a>
 * @see <a href="https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference-uk">English (UK) Speechcons</a>
 * @see <a href="https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference-de">German Speechcons</a>
 * @returns {AlexaSsmlBuilder}
 */
AlexaSsmlBuilder.prototype.speakWithSpeechcon = function (speechcon) {
    return this.speakAs(speechcon, this.INTERPRET_AS_INTERJECTION);
};

AlexaSsmlBuilder.prototype.isValidRateString = function (rate) {
    return isString(rate) &&
        rate.endsWith("%") &&
        rate.length > 2;
};

AlexaSsmlBuilder.prototype.getRateErrorMessage = function() {
    return "Rate should be a percent increase/decrease (ie. 150%/50%) or one of: " + this.RATES;
};

AlexaSsmlBuilder.prototype.checkInterpretAsValue = function(interpretAs) {
    if (!(interpretAs === this.INTERPRET_AS_INTERJECTION) && this.INTERPRET_AS_VALUES.indexOf(interpretAs) === -1) {
        throw new TypeError("Type should be one of: " + this.INTERPRET_AS_INTERJECTION + "," + this.INTERPRET_AS_VALUES);
    }
};

AlexaSsmlBuilder.prototype.checkRoleValue = function (role) {
    if (!(role === this.ROLE_NOUN) && this.ROLES.indexOf(role) === -1) {
        throw new TypeError("Role must be one of: " + this.ROLES);
    }
};

