export interface Player {
    id: number,
    name: string,
    team_name: string,
    team_code: string,
    rating: number,
    category: string
}

export interface Participant {
    user__name: string,
    user__college__name: string,
    points: number,
    rank: number,
    user__mobile_number: string,
}

export interface Match {
    match__home_team: string,
    match__away_team: string,
    match__date: string,
    match__home_team_code: string,
    match__away_team_code: string,
    id: number,
    p1: Player,
    p2: Player,
    p3: Player,
    player1: number,
    player2: number,
    player3: number,
    player1_err: string,
    player2_err: string,
    player3_err: string,
    match_title: string,
    match_time: string,
    sub_team: Player[],
    not_done: Boolean,
}