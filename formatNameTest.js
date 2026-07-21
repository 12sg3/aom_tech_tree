const WORDS_ALL_LOWERCASE = ['of', 'the', 'and', 'vs', 'vs.', 'with', 'a', 'an', 'in', 'on', 'for', 'to', 'by', 'from'];

function formatName(originalname) {
    if (originalname === 'ame-no-uzume') {
        return 'Ame-No-Uzume';
    }
    let name = originalname.toString().replace(/<br>/g, '\n').replace(/\n+/g, '\n');
    const words = name.split(' ');
    // console.log('words: ', words);
    for (let i = 0; i < words.length; i++) {
        
        const titleCase = str => str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const word = words[i];
        if (!WORDS_ALL_LOWERCASE.includes(word)) {
            // words[i] = word.replace(/\b\w/g, word => word.toUpperCase());
            words[i] = titleCase(word);
        }
    }
    // console.log('words: ', words);
    name = words.join(' ').replace("'S", "'s");
    const items = name.split('\n');
    for (let i = 0; i < items.length; i++) {
        // console.log('inFormatName -items[i]: ', items[i]);
        const item = items[i];
        if (items[i].length > 10) {
            let space = item.indexOf(' ');
            if (space !== -1) {
                items[i] = item.slice(0, space) + '\n' + item.slice(space + 1);
                let alternativeSpace = space + 1 + item.slice(space + 1).indexOf(' ');
                if (alternativeSpace !== -1) {
                    if (Math.abs((item.length / 2) - alternativeSpace) < Math.abs((item.length / 2) - space)) {
                        items[i] = item.slice(0, alternativeSpace) + '\n' + item.slice(alternativeSpace + 1);
                    }
                }
            } else {
                let hyphen = item.indexOf('-');
                if (hyphen !== -1) {
                    items[i] = item.slice(0, hyphen) + '-\n' + item.slice(hyphen + 1);
                    let alternativeHyphen = hyphen + 1 + item.slice(hyphen + 1).indexOf('-');
                    if (alternativeHyphen !== -1) {
                        if (Math.abs((item.length / 2) - alternativeHyphen) < Math.abs((item.length / 2) - hyphen)) {
                            items[i] = item.slice(0, alternativeHyphen) + '-\n' + item.slice(alternativeHyphen + 1);
                        }
                    }
                }
            }
        }
    }
    return items.join('\n');
}

let test_str = "f\u016bjin";
let test_str2 = "\u014dkuninushi"
let test_str3 = "huehuec\u00f3yotl"
let test_str4 = "inari \u014dkami"
let test_str5 = 'ame-no-uzume'

console.log(formatName(test_str));
console.log(formatName(test_str2));
console.log(formatName(test_str3));
console.log(formatName(test_str4));

console.log(formatName(test_str5));

// console.log(test_str.toUpperCase());

// const titleCase = str => str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

// console.log(titleCase(test_str));
// console.log(titleCase(test_str2));
// console.log(titleCase(test_str3));
// console.log(titleCase(test_str4));