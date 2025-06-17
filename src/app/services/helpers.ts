import { keyword, rgb } from 'color-convert';
import { KEYWORD, RGB } from 'color-convert/conversions';
import namer from 'color-namer';
import { Question } from '../models/question.model';

export function randomNumber(min: number, max: number, includeMax = false): number {
    const range = includeMax ? max - min + 1 : max - min;
    return Math.floor(Math.random() * range) + min;
}

export function randomItem<T>(items: T[]): T {
    const index = randomNumber(0, items.length);
    return items[index];
}

export function randomItems<T>(items: T[], count: number): T[] {
    const res: T[] = [];

    while (res.length < count) {
        const newItem = randomItem(items);
        items = items.filter((i) => i !== newItem);
        res.push(newItem);
    }

    return res;
}

const KNOWN_COLORS: KEYWORD[] = [
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'purple',
    'magenta',
    'cyan',
    'gray',
    'brown',
    'teal',
    'gold',
    'lime',
    'tomato',
];

/**
 * Adds multiple RGB colors together, channel by channel, and ensures that the resulting
 * RGB values do not exceed 255.
 *
 * @param {...RGB[]} rgbs - A variable number of RGB color arrays to be added.
 * @returns {RGB} The resulting RGB color after addition, with each channel capped at 255.
 */

export function addRgb(...rgbs: RGB[]): RGB {
    const res: RGB = [0, 0, 0];

    for (let index = 0; index < 3; index++) {
        const sum = rgbs.reduce((acc, c) => acc + c[index], 0);
        res[index] = Math.min(sum, 255);
    }

    return res;
}

/**
 * Generates a question where the correct answer is the name of a color that is the result of adding 2 or 3 colors.
 * The 2 or 3 colors are chosen randomly from the list of known colors.
 * The possible answers are the names of the colors at 25%, 50%, 75%, 100% of the possible colors.
 * The correct answer is one of the possible answers.
 * @returns A question with a caption of 2 or 3 colors, answers which are the names of colors and a correctIndex which is the index of the correct answer.
 */
export function randomColorQuestion() {
    const twoOrThree = randomNumber(2, 3, true);
    const colors = randomItems([...KNOWN_COLORS], twoOrThree) as [KEYWORD, KEYWORD] | [KEYWORD, KEYWORD, KEYWORD];
    const rgbs = colors.map((clr) => keyword.rgb(clr));
    const added = addRgb(...rgbs);
    const addedHex = rgb.hex(added);

    const htmlCols = namer(addedHex).html;
    const names = htmlCols.map((n) => n.name);
    const name = names[0];

    const answers = [names[25], names[50], names[75], names[100]];
    const correctIndex = randomNumber(0, 4);
    answers[correctIndex] = name;

    const question: Question = {
        caption: colors,
        answers,
        correctIndex,
    };
    return question;
}

/**
 * Generates an array of random color questions.
 * The length of the array is a random number between 6 and 20.
 * Each question is a random color question.
 * @returns {Question[]} An array of random color questions.
 */
export function randomColorQuiz() {
    return Array.from({
        length: randomNumber(6, 20),
    }).map((_) => randomColorQuestion());
}

/**
 * Splits camelCase string into space-separated words.
 * @example
 * splitCamelCase('helloWorld') // 'hello World'
 * @param {string} str The camelCase string to split.
 * @returns {string} The space-separated string.
 */
function splitCamelCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

const COLOR_DISPLAY_NAMES = getColorDisplayNameMap();

/**
 * Returns a map of HTML color names to their display names.
 * The map is case-insensitive and can be used to get the display name of a color given its name.
 * The keys are the lowercased HTML color names and the values are their display names.
 * @returns {Record<string, string>} A map of HTML color names to their display names.
 */
export function getColorDisplayNameMap() {
    const htmlColors = [
        'AliceBlue',
        'AntiqueWhite',
        'Aqua',
        'Aquamarine',
        'Azure',
        'Beige',
        'Bisque',
        'Black',
        'BlanchedAlmond',
        'Blue',
        'BlueViolet',
        'Brown',
        'BurlyWood',
        'CadetBlue',
        'Chartreuse',
        'Chocolate',
        'Coral',
        'CornflowerBlue',
        'Cornsilk',
        'Crimson',
        'Cyan',
        'DarkBlue',
        'DarkCyan',
        'DarkGoldenRod',
        'DarkGray',
        'DarkGrey',
        'DarkGreen',
        'DarkKhaki',
        'DarkMagenta',
        'DarkOliveGreen',
        'Darkorange',
        'DarkOrchid',
        'DarkRed',
        'DarkSalmon',
        'DarkSeaGreen',
        'DarkSlateBlue',
        'DarkSlateGray',
        'DarkSlateGrey',
        'DarkTurquoise',
        'DarkViolet',
        'DeepPink',
        'DeepSkyBlue',
        'DimGray',
        'DimGrey',
        'DodgerBlue',
        'FireBrick',
        'FloralWhite',
        'ForestGreen',
        'Fuchsia',
        'Gainsboro',
        'GhostWhite',
        'Gold',
        'GoldenRod',
        'Gray',
        'Grey',
        'Green',
        'GreenYellow',
        'HoneyDew',
        'HotPink',
        'IndianRed',
        'Indigo',
        'Ivory',
        'Khaki',
        'Lavender',
        'LavenderBlush',
        'LawnGreen',
        'LemonChiffon',
        'LightBlue',
        'LightCoral',
        'LightCyan',
        'LightGoldenRodYellow',
        'LightGray',
        'LightGrey',
        'LightGreen',
        'LightPink',
        'LightSalmon',
        'LightSeaGreen',
        'LightSkyBlue',
        'LightSlateGray',
        'LightSlateGrey',
        'LightSteelBlue',
        'LightYellow',
        'Lime',
        'LimeGreen',
        'Linen',
        'Magenta',
        'Maroon',
        'MediumAquaMarine',
        'MediumBlue',
        'MediumOrchid',
        'MediumPurple',
        'MediumSeaGreen',
        'MediumSlateBlue',
        'MediumSpringGreen',
        'MediumTurquoise',
        'MediumVioletRed',
        'MidnightBlue',
        'MintCream',
        'MistyRose',
        'Moccasin',
        'NavajoWhite',
        'Navy',
        'OldLace',
        'Olive',
        'OliveDrab',
        'Orange',
        'OrangeRed',
        'Orchid',
        'PaleGoldenRod',
        'PaleGreen',
        'PaleTurquoise',
        'PaleVioletRed',
        'PapayaWhip',
        'PeachPuff',
        'Peru',
        'Pink',
        'Plum',
        'PowderBlue',
        'Purple',
        'RebeccaPurple',
        'Red',
        'RosyBrown',
        'RoyalBlue',
        'SaddleBrown',
        'Salmon',
        'SandyBrown',
        'SeaGreen',
        'SeaShell',
        'Sienna',
        'Silver',
        'SkyBlue',
        'SlateBlue',
        'SlateGray',
        'SlateGrey',
        'Snow',
        'SpringGreen',
        'SteelBlue',
        'Tan',
        'Teal',
        'Thistle',
        'Tomato',
        'Turquoise',
        'Violet',
        'Wheat',
        'White',
        'WhiteSmoke',
        'Yellow',
        'YellowGreen',
    ];

    return Object.fromEntries(htmlColors.map((clr) => [clr.toLowerCase(), splitCamelCase(clr)]));
}

/**
 * Returns the display name of the given color.
 * The display name is the camelCase color name with spaces between words.
 * The function is case-insensitive.
 * @example
 * displayNameOfColor('red') // 'Red'
 * displayNameOfColor('darkGreen') // 'Dark Green'
 * @param {string} color The color name to get the display name of.
 * @returns {string} The display name of the given color.
 */
export function displayNameOfColor(color: string) {
    return COLOR_DISPLAY_NAMES[color.toLowerCase()];
}
