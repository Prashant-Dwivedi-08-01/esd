export const endpoints = (req, res) => {
    res.status(200).json({
        status: "Success",
        base_urls: "https://ebill-management-system.herokuapp.com/api/",
        authorization_message:"For some endpoints we need user/officer authentication. For such endpoints, please authorize first using the authorization endpoints for authentication and get your token and secret_key, then pass that token as authorization and secret key as secret_key in header.",
        end_points: {
            user: [
                {
                    function: "Register the User",
                    method: "POST",
                    example_parmeter: {
                        name: "Prashant",
                        username: "prashant123",
                        address: "A-301, Bhadra Nagar",
                        pincode: "421201",
                        phone: "9082765110",
                        meterNumber: "A105",
                        password: "Prashant@123",
                        confirmPassword: "Prashant@123",
                    },
                    authorization: "No Authorization needed",
                    endpoint: "/user/register",
                },
                {
                    function: "Authentication",
                    method: "POST",
                    example_parmeter: {
                        username: "prashant123",
                        password: "Prashant@123",
                    },
                    endpoint: "/user/auth",
                },
                {
                    function: "Check Your Bill Using Your Meter Number",
                    method: "GET",
                    authorization: "No Authorization needed",
                    endpoint: "/user/check-bill/meterNumber",
                    example: "/user/check-bill/A1010"
                },
                {
                    function: "Pay Your Bill",
                    method: "POST",
                    authorization: "Authorization Needed",
                    example_header:{
                        Authorization:"Bearer <your token>",
                        secret_key: "<your secret_key>"
                    },
                    example_parmeter: {
                        month: "August",
                        amount: "300",
                    },
                    endpoint: "/user/pay-bill/meterNumber",
                    example: "/user/pay-bill/A1010"
                },
                {
                    function: "Update the User Information",
                    method: "PATCH",
                    authorization: "Authorization needed",
                    example_header:{
                        Authorization:"Bearer <your token>",
                        secret_key: "<your secret_key>"
                    },
                    example_parmeter: {
                        name: "Prashant",
                        username: "prashant123",
                        address: "A-301, Bhadra Nagar",
                        pincode: "421201",
                        phone: "9082765110",
                    },
                    endpoint: "/user/update",
                },
            ],
            officer: [
                {
                    function: "Officer Authorization",
                    method: "POST",
                    example_parmeter: {
                        officer_id: 'A123',
                        password: "Jack@123"
                    },
                    endpoint: "/officer/auth",
                },
                {
                    function: "Insert a billing document",
                    method: "POST",
                    authorization: "Authorization needed",
                    example_header:{
                        Authorization:"Bearer <your token>",
                        secret_key: "<your secret_key>"
                    },
                    example_parmeter: {
                        meterNumber: "ST1010",
                        billingUnit: 120, 
                        status: "Unpaid"
                    },
                    endpoint: "/officer/insert-bill",
                },
                {
                    function: "Check all the Bills in database",
                    method: "POST",
                    authorization: "Authorization needed",
                    example_header:{
                        Authorization:"Bearer <your token>",
                        secret_key: "<your secret_key>"
                    },
                    optional_example_parmeter: {
                        month: "August"
                    },
                    endpoint: "/officer/check-bill",
                },
                {
                    function: "Check all the User in database using optional search parameters",
                    method: "POST",
                    authorization: "Authorization needed",
                    example_header:{
                        Authorization:"Bearer <your token>",
                        secret_key: "<your secret_key>"
                    },
                    optional_example_parmeter: {
                        pincode: "421201"
                    },
                    endpoint: "/officer/check-user",
                },
                {
                    function: "Update any bill in database using existing meterNumber",
                    method: "PATCH",
                    authorization: "Authorization needed",
                    example_header:{
                        Authorization:"Bearer <your token>",
                        secret_key: "<your secret_key>"
                    },
                    optional_example_parmeter: {
                        meterNumber: "ST1010",
                        billingUnit: 120, 
                        status: "Unpaid"
                    },
                    endpoint: "/officer/update-bill",
                },
                {
                    function: "Delete any Billing Record using meterNumber",
                    method: "DELETE",
                    authorization: "Authorization needed",
                    example_header:{
                        Authorization:"Bearer <your token>",
                        secret_key: "<your secret_key>"
                    },
                    endpoint: "/officer/delete-bill/meterNumber",
                    example:  "/officer/delete-bill/ST1010",
                },
                {
                    function: "Delete a user form entire database",
                    method: "DELETE",
                    authorization: "Authorization needed",
                    example_header:{
                        Authorization:"Bearer <your token>",
                        secret_key: "<your secret_key>"
                    },
                    endpoint: "/officer/delete-user/meterNumber",
                    example:  "/officer/delete-user/ST1010",
                },
            ]
        }

    })
}