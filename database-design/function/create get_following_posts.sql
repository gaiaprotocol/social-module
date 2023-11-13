CREATE OR REPLACE FUNCTION get_following_posts(
    p_user_id uuid,
    last_post_id int8 DEFAULT NULL,
    max_count int DEFAULT NULL
)
RETURNS SETOF posts AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        p.*
    FROM 
        posts p
    INNER JOIN 
        follows f ON p.author = f.followee_id
    WHERE 
        f.follower_id = p_user_id
        AND (last_post_id IS NULL OR p.id < last_post_id)
    ORDER BY 
        p.id DESC
    LIMIT 
        max_count;
END;
$$ LANGUAGE plpgsql;
