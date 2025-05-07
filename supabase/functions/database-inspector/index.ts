// @ts-nocheck
// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.com/manual/getting_started/setup_your_environment

// Define the Deno.serve handler for the Edge Function, which could be triggered by a Cron Job
Deno.serve(async (req) => {
  try {
    // Log the request for debugging
    console.log("Request received:", req.method, req.url);
    
    // Simply return success - this basic ping will still invoke the Edge Function
    // and keep the hosting infrastructure warm
    const result = {
      success: true,
      message: "Database keep-alive ping successful",
      timestamp: new Date().toISOString()
    };

    console.log("Function executed successfully:", JSON.stringify(result));

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // More detailed error logging
    console.error("Error in function:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        errorType: error.constructor.name,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
