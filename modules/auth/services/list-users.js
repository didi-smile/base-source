//@ts-check

async function getListUsers(page, limit) {
    const data = await this.userRepository.getMany();

    return data;
}

module.exports = dependencies => {
    const {
        userRepository,
    } = dependencies;

    return getListUsers.bind({ userRepository });
};
