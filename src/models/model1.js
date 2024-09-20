export default function modelisation(data, typeGraph) {
    switch (typeGraph) {
      case 'ActivityChart':
       
        break;
        
      case 'Chart':
     
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data.data.sessions = data.data.sessions.map((e) => ({
          ...e,
          day: days[e.day - 1]
        }));
        break;
        
      case 'PerformanceChart':
        data.data.data = data.data.data.map((e) => ({
          ...e,
          kind: data.data.kind[e.kind]
        }));
        break;
        
     case 'TodayScore':
        let todayScore = data.data.todayScore || data.data.score;
        const value = todayScore * 100;
        data = [
          { name: 'Score', value: value },
          { name: 'AntiScore', value: 100 - value }
        ];
        break;
        
      default:
        console.log(`Sorry, we are out of ${typeGraph}.`);
        break;
    }
    return data; 
}