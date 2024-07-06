import axios from 'axios';
import CreSidebar from '../../components/Creator-Components/CreSidebar';
import CreDashMain from '../../components/Creator-Components/Dashboard/CreDashMain';
import { useEffect, useState } from 'react';

export function CreDashborad() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/creator/user', {
          headers: {
            Authorization: localStorage.getItem('CreToken'),
          },
        });
        setUsername(response.data.firstName);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <div className="flex">
        <CreSidebar />
        <CreDashMain username={username} />
      </div>
    </div>
  );
}
