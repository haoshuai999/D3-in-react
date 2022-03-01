import { useData } from "./useData";
import { Covid } from "./Covid";

const dataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

const CovidData = () => {
    const data = useData(dataUrl);

    return data ? <Covid data={data} /> : <pre>Loading...</pre>;
}

export default CovidData;