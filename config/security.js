module.exports = {
    jwt : {
        secretOrKey         : 's3cr3t',
        issuer              : undefined,    // accounts.examplesoft.com
        audience            : undefined,    // yoursite.net
        expiresInMinutes    : 60*8          // 8 hours
    }
}