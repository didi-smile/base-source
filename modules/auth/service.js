async function getListUsers(page, limit) {
    const data = await this.userRepository.getMany();

    return data;
}

module.exports = dependencies => {
    const {
        userRepository,
    } = dependencies;

    return {
        getListUsers: getListUsers.bind({ userRepository }),
    };
};
