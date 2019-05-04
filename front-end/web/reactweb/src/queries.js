import gql from 'graphql-tag';

export const all_movie = gql`
    query find {
        movies {
            idx
            kor_title
            eng_title
            genre
            show_time
            opening_date
            movie_director
            movie_stars
            movie_rating
            movie_plot
            naver_audience_rating
            naver_journalist_rating
            poster_url
            preview {
                preview_title,
                preview_url
            }
            naver_link
            booking_rate
            total_audience
            cgv_rating
            daum_rating
            write_time
            update_time
            opening_pre
        }
    }
`;

export const Detail_PAGE = gql`
    query{
        movie(kore_title: "생일"){
            idx
            kor_title
        }
    }
`;