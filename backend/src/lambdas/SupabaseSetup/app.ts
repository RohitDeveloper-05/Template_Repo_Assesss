import { APIGatewayProxyHandler } from 'aws-lambda';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const lambdaHandler: APIGatewayProxyHandler = async (event) => {
    try {
        const { data, error } = await supabase.from('Testing_Assesment_Table').select('*');

        if (error) {
            console.error('Supabase error:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Error fetching data from Supabase',
                    error: error.message,
                }),
            };
        }

        console.log('Fetched data:', data);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Fetched from Supabase!',
                data,
            }),
        };
    } catch (err) {
        console.error('Unexpected error:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Unexpected server error',
                error: String(err),
            }),
        };
    }
};
