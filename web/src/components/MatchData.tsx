import { MatchType } from "../pages/Dashboard";

type MatchDataProps = {
  match: MatchType;
}

export function MatchData(props: MatchDataProps) {
  const { match } = props;
  return (
    <div className="w-full shadow-lg px-7 py-1 bg-white dark:bg-gray-400 flex flex-col items-center rounded-md	">
      <span>
        <strong>{match.championship} {match.match_hour}</strong>
      </span>
      <div className="w-full flex justify-between px-4 py-6">
        <div className="flex flex-col items-center">
          <h1>{match.home_team}</h1>
          <img src={match.home_image} loading="lazy" className="w-20" alt={match.home_image} />
        </div>
        <div className="flex items-center">
          <strong className="text-6xl pr-2">{match.home_score}</strong>
          <span className="text-2xl">x</span>
          <strong className="text-6xl pl-2">{match.away_score}</strong>
        </div>
        <div className="flex flex-col items-center">
          <h1>{match.away_team}</h1>
          <img src={match.away_image} loading="lazy" className="w-20" alt={match.away_team} />
        </div>
      </div>
    </div>
  )
}