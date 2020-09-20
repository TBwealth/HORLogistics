export const Util = {

    getDomain(env: string): string {


        if(env == 'local')
        {
            return "https://localhost:44381";
        }

        if(env == 'development')
        {
            return "https://centralsys.azurewebsites.net/api/proxy/GetBaseUrl";
        }

        if(env == 'companydevelopment')
        {

        }

        if(env == 'staging')
        {

        }

        if(env == 'demo')
        {

        }

        if(env == 'production')
        {
           
        }


        if(env == 'localmain')
        {
            return "http://localhost:8000/api/";
        }

        if(env == 'developmentmain')
        {
            return "https://qatestbed.azurewebsites.net/api/mobile/";
        }

        if(env == 'companydevelopmentmain')
        {

        }

        if(env == 'stagingmain')
        {

        }

        if(env == 'demomain')
        {

        }

        if(env == 'productionmain')
        {
            
        }

    }

}
