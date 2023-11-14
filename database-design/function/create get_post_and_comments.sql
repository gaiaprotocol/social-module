CREATE OR REPLACE FUNCTION get_post_and_comments(
    p_post_id int8, 
    signed_user_id uuid DEFAULT NULL
)
RETURNS TABLE (
    id int8,
    author uuid,
    author_display_name text,
    author_profile_image text,
    author_profile_image_thumbnail text,
    author_x_username text,
    message text,
    translated jsonb,
    rich jsonb,
    parent int8,
    comment_count int4,
    repost_count int4,
    like_count int4,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    liked boolean,
    reposted boolean,
    depth int4
)
LANGUAGE SQL AS $$
WITH RECURSIVE ancestors AS (
    SELECT 
        p.id,
        p.author,
        u.display_name,
        u.profile_image,
        u.profile_image_thumbnail,
        u.x_username,
        p.message,
        p.translated,
        p.rich,
        p.parent,
        p.comment_count,
        p.repost_count,
        p.like_count,
        p.created_at,
        p.updated_at,
        CASE 
            WHEN signed_user_id IS NOT NULL THEN 
                EXISTS (SELECT 1 FROM post_likes pl WHERE pl.post_id = p.id AND pl.user_id = signed_user_id)
            ELSE FALSE 
        END AS liked,
        CASE 
            WHEN signed_user_id IS NOT NULL THEN 
                EXISTS (SELECT 1 FROM reposts r WHERE r.post_id = p.id AND r.user_id = signed_user_id)
            ELSE FALSE 
        END AS reposted,
        0 AS depth
    FROM 
        posts p
    INNER JOIN 
        users_public u ON p.author = u.user_id
    WHERE 
        p.id = p_post_id

    UNION

    SELECT 
        p.id,
        p.author,
        u.display_name,
        u.profile_image,
        u.profile_image_thumbnail,
        u.x_username,
        p.message,
        p.translated,
        p.rich,
        p.parent,
        p.comment_count,
        p.repost_count,
        p.like_count,
        p.created_at,
        p.updated_at,
        CASE 
            WHEN signed_user_id IS NOT NULL THEN 
                EXISTS (SELECT 1 FROM post_likes pl WHERE pl.post_id = p.id AND pl.user_id = signed_user_id)
            ELSE FALSE 
        END AS liked,
        CASE 
            WHEN signed_user_id IS NOT NULL THEN 
                EXISTS (SELECT 1 FROM reposts r WHERE r.post_id = p.id AND r.user_id = signed_user_id)
            ELSE FALSE 
        END AS reposted,
        a.depth - 1 AS depth
    FROM 
        posts p
    INNER JOIN 
        users_public u ON p.author = u.user_id
    JOIN 
        ancestors a ON p.id = a.parent
),
descendants AS (
    SELECT 
        p.id,
        p.author,
        u.display_name,
        u.profile_image,
        u.profile_image_thumbnail,
        u.x_username,
        p.message,
        p.translated,
        p.rich,
        p.parent,
        p.comment_count,
        p.repost_count,
        p.like_count,
        p.created_at,
        p.updated_at,
        CASE 
            WHEN signed_user_id IS NOT NULL THEN 
                EXISTS (SELECT 1 FROM post_likes pl WHERE pl.post_id = p.id AND pl.user_id = signed_user_id)
            ELSE FALSE 
        END AS liked,
        CASE 
            WHEN signed_user_id IS NOT NULL THEN 
                EXISTS (SELECT 1 FROM reposts r WHERE r.post_id = p.id AND r.user_id = signed_user_id)
            ELSE FALSE 
        END AS reposted,
        1 AS depth
    FROM 
        posts p
    INNER JOIN 
        users_public u ON p.author = u.user_id
    WHERE 
        parent = p_post_id

    UNION

    SELECT 
        p.id,
        p.author,
        u.display_name,
        u.profile_image,
        u.profile_image_thumbnail,
        u.x_username,
        p.message,
        p.translated,
        p.rich,
        p.parent,
        p.comment_count,
        p.repost_count,
        p.like_count,
        p.created_at,
        p.updated_at,
        CASE 
            WHEN signed_user_id IS NOT NULL THEN 
                EXISTS (SELECT 1 FROM post_likes pl WHERE pl.post_id = p.id AND pl.user_id = signed_user_id)
            ELSE FALSE 
        END AS liked,
        CASE 
            WHEN signed_user_id IS NOT NULL THEN 
                EXISTS (SELECT 1 FROM reposts r WHERE r.post_id = p.id AND r.user_id = signed_user_id)
            ELSE FALSE 
        END AS reposted,
        d.depth + 1 AS depth
    FROM 
        posts p
    INNER JOIN 
        users_public u ON p.author = u.user_id
    JOIN 
        descendants d ON p.parent = d.id
)
SELECT * FROM ancestors
UNION ALL
SELECT * FROM descendants
ORDER BY depth, created_at;
$$;
