import { useRef, useState } from 'react';
import { Umbrella, MagnifyingGlass, MapPin, Drop, Wind } from 'phosphor-react';
import { weatherApi } from './services';

const App = () => {
  interface Search {
    city: string;
  }

  const search = useRef<Search>({} as Search);

  // const [backgroundImage, setBackgroundImage] = useState();
  const [cityWeather, setCityWeather] = useState<any>();

  // const getUnsplashImage = async (query: string) => {
  //   await unsplashApi
  //     .get('', {
  //       params: {
  //         query,
  //         client_id: import.meta.env.VITE_UNSPLASH_CLIENT_ID,
  //       },
  //     })
  //     .then((res) => setBackgroundImage(res.data.results[0].urls.raw));
  // };

  const getCityWeather = async () => {
    await weatherApi
      .get('', {
        params: {
          q: search.current.city,
          units: 'metric',
          lang: 'pt_br',
          appid: import.meta.env.VITE_OPEN_WEATHER_API_ID,
        },
      })
      .then((res) => setCityWeather(res.data))
      .catch(() => setCityWeather({ message: 'Cidade não encontrada.' }));
  };

  // useEffect(() => {
  //   getUnsplashImage('clima');
  // }, []);

  // useEffect(() => {
  //   if (cityWeather) {
  //     getUnsplashImage(cityWeather.name);
  //   }
  // }, [cityWeather]);

  return (
    <div
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1611497601666-d443be26befe?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzOTgxNTN8MHwxfHNlYXJjaHwxfHxjbGltYXxlbnwwfHx8fDE2NzM0ODA1ODY&ixlib=rb-4.0.3&q=80)`,
      }}
      className='h-screen w-screen flex items-center justify-center font-poppins bg-no-repeat bg-cover'
    >
      <div className='w-full sm:w-fit flex flex-col items-center p-12 bg-indigo-800 text-white rounded shadow'>
        <div className='flex mb-8'>
          <p className='text-3xl mr-2'>Clima Agora</p>
          <Umbrella fontSize={26} weight='fill' />
        </div>
        <div className='h-10 flex items-center'>
          <input
            className='h-10 w-52 sm:w-fit p-2 rounded outline-none transition bg-slate-100 focus:bg-white text-black'
            type='text'
            placeholder='Busque por uma cidade'
            onChange={({ target: { value } }) => (search.current.city = value)}
          />
          <button
            className='h-10 w-10 flex items-center justify-center p-2 ml-2 rounded transition bg-[#00aa44] hover:bg-[#00bb55]'
            onClick={getCityWeather}
          >
            <MagnifyingGlass fontSize={18} weight='bold' />
          </button>
        </div>
        {cityWeather?.message && (
          <span className='mt-4 text-lg text-amber-400'>{cityWeather.message}</span>
        )}
        {cityWeather?.main && (
          <div className='flex flex-col items-center pt-8'>
            <div className='flex items-center text-2xl'>
              <MapPin weight='fill' />
              <p className='ml-2 mr-4'>{cityWeather.name}</p>
              <img
                className='h-6'
                crossOrigin='anonymous'
                src={`https://countryflagsapi.com/png/${cityWeather.sys.country}`}
                alt='Country Flag'
              />
            </div>
            <p className='text-xl mt-4 mb-2'>{cityWeather.main.temp}° C</p>
            <div className='flex items-center'>
              <p className='text-lg capitalize'>{cityWeather.weather[0].description}</p>
              <img
                src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`}
                alt='City Weather Icon'
              />
            </div>
            <div className='flex items-center gap-4 text-lg mt-4'>
              <div className='flex items-center'>
                <Drop weight='fill' />
                <p className='ml-2'>{cityWeather.main.humidity}%</p>
              </div>
              <div className='h-8 w-[2px] rounded-full bg-white' />
              <div className='flex items-center'>
                <Wind />
                <p className='ml-2'>{cityWeather.wind.speed}Km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
