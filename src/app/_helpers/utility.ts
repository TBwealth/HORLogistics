export const Util = {

    getDomain(env: string): string {


        if(env == 'local')
        {
            return "";
        }

        if(env == 'development')
        {
            return "http://40.91.215.240:8008";
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
            return "";
        }

        if(env == 'developmentmain')
        {
            return "";
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
