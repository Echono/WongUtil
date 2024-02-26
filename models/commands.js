const TEST_COMMAND = {
    name: 'test',
    description: 'Basic testing command',
    type: 1
};

const ALL_COMMANDS = [
    TEST_COMMAND
];

export function getCommands() {
    return ALL_COMMANDS;
}