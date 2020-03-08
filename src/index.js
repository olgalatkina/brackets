module.exports = function check(str, bracketsConfig) {
    let stack = [];

    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < bracketsConfig.length; j++) {

            // Check if paired symbols like e.g. '||'
            // are used as sort of brackets:
            if (str[i] === bracketsConfig[j][0] &&
                str[i] === bracketsConfig[j][1]) {

                if (stack.length > 0 &&
                    stack[stack.length - 1] === str[i]) {
                    stack.pop();
                } else {
                    stack.push(str[i]);
                }
                break;
            }

            // OK, here we know that opening and closing
            // brackets differ, like e.g. '(' and ')'

            // Check if str[i] is an opening bracket
            if (str[i] === bracketsConfig[j][0]) {
                stack.push(str[i]);
                break;
            }

            // Check if str[i] is a closing bracket
            if (str[i] === bracketsConfig[j][1]) {
                if (stack.length > 0) {
                    let temp = stack.pop();

                    if (temp !== bracketsConfig[j][0]) {
                        return false;
                    }
                } else {
                    return false;
                }
                break;
            }
        }
    }

    return stack.length === 0;
}
