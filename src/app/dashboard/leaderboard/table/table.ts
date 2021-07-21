export interface Table{
    data: position[];
    heading: string,
    subheading: string
}
export interface position {
    name: string,
    score: string,
    is_me: string,
    rank: string,
}

export interface activity{
    referrals: string,
    blogs: string,
    weekly_questions: string,
    weekly_tasks: string,
}