module.exports= {
    presets:[
        [
            '@babel/env',
            {targets:
                {
                    node: 'current',
                },
            },
        ],
    ],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    }
};