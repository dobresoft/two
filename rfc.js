const nodeRfc = require('node-rfc');
const pool = new nodeRfc.Pool({ connectionParameters: { dest: "R36" }});

(async () => {
    try {
        const client = await pool.acquire();

        const result = await client.call("BAPI_USER_GET_DETAIL", {
            USERNAME: "GLOPEZ",
        });

        console.log(result);
    
    } catch (err) {
        console.error(err);
    }
})();