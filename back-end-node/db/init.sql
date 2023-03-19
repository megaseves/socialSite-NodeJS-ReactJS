DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS friends CASCADE;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username VARCHAR (50) NOT NULL,
  password TEXT NOT NULL,
  email VARCHAR (255) UNIQUE NOT NULL,
  avatar TEXT,
  created_on TIMESTAMP NOT NULL
);

CREATE TABLE friends (
  id INT GENERATED ALWAYS AS IDENTITY,
  user_id int,
  friend_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_user_id
  FOREIGN KEY (user_id)
  REFERENCES users(user_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Lufy', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'megaseves@gmail.com', 'https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/1b17f479bdf961a801080529df03b46be69ccfbf18ca4a5c69d0152f3bcbed5e?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJHMEUCIQCQn4PFKw3%2BnBE65HbhChc%2BudD5LjR5WZZmZBYhbScFWQIgPsgf4ouUtByHelXlETv42tYsorwKEfxu57RP6ath7QYq5AIIXRAAGgw3NTE5MTMxMjc2NzQiDNhdc339vbS%2BCU2n3irBAtxP2O3GxU3kvODxU%2FnzrKf0UboQ8bFU8uz1MwTWEmTeVS6Q5oNJ43sNOTF2chIOGQaJU3IqT55NF5VVa%2F9JqWdKM69Ef6Smu%2BnXaIAh6UBI3vWkafoguSCdjurSjlfdVDdppruxGEmrWWNupDwqVjB6X%2F37%2FLkkF3qllKFQyAwRg%2F3U48EV%2BDwyV8WEN2pA6ijJiPEV2zNuCjy44idmBpIaRJtEgBLZFtTiOhbN%2Fodiv7Ua6WBcn6CHguZ2OZmIdqFS0LMPVNAS5cJskgmXq%2F9VF08L9FC3tpin1isiYhh%2F2uZLwGOxP%2BZP9fHGjkPH%2F6VFNTYgC3rgX7iu2jRS7%2BwxEKNZJqBxZQcBJOLW6vtjW%2Fgke9dHzqf6TtCbYjwW2kHL9MCCbenoovt1KrEEeP1zYyvlg1AGUdITKYU5fgyjIjDC9dugBjqzAlpX5y97qktHnCZ4a0%2FKZl9Qv%2BQnt1oBgWt9GgKyjm49YnPIxSWc18lFy1gnxIqORTVD3XErgPP6ouJoqxBVGA6ukEXOdEsf6dPgSVI8J2mB67twcjUoFYHAGUrAbbXEUDCDjn%2BQD6rP91%2B5Bf9jB6sKbHGgkzCKfxXQ5w30OzldG34g78sX5YCtS0JlR4OgJLGlTK2egXYxYftdHSUKCtH8D%2Bpkbq4JV6az76RSOiQ97nZQIIWHLm5YBlbNbLjHBduWXy4p4KZXPFigSRdoPG9vucYpkJ9FZiUA1A90MyFHaSYl6474OwvrHTr8XqpdPxUk4Fg4PM3Fq3uh6BnSeRa32Gqit35KSVpuJBygI%2BZTW75Q2x1P19Q6J4NE2a38v7g6fB2H5bbRLDbOajatYbKNnC0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230319T165412Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA26EMDZ35BQHUVZHD%2F20230319%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=6e579571cc0bdef32ec54041ecc57dd3fc1b1434b54e99a05642e9ce76db3d9b', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Szalami', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'szalami@gmail.com', 'https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/1b17f479bdf961a801080529df03b46be69ccfbf18ca4a5c69d0152f3bcbed5e?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJHMEUCIQCQn4PFKw3%2BnBE65HbhChc%2BudD5LjR5WZZmZBYhbScFWQIgPsgf4ouUtByHelXlETv42tYsorwKEfxu57RP6ath7QYq5AIIXRAAGgw3NTE5MTMxMjc2NzQiDNhdc339vbS%2BCU2n3irBAtxP2O3GxU3kvODxU%2FnzrKf0UboQ8bFU8uz1MwTWEmTeVS6Q5oNJ43sNOTF2chIOGQaJU3IqT55NF5VVa%2F9JqWdKM69Ef6Smu%2BnXaIAh6UBI3vWkafoguSCdjurSjlfdVDdppruxGEmrWWNupDwqVjB6X%2F37%2FLkkF3qllKFQyAwRg%2F3U48EV%2BDwyV8WEN2pA6ijJiPEV2zNuCjy44idmBpIaRJtEgBLZFtTiOhbN%2Fodiv7Ua6WBcn6CHguZ2OZmIdqFS0LMPVNAS5cJskgmXq%2F9VF08L9FC3tpin1isiYhh%2F2uZLwGOxP%2BZP9fHGjkPH%2F6VFNTYgC3rgX7iu2jRS7%2BwxEKNZJqBxZQcBJOLW6vtjW%2Fgke9dHzqf6TtCbYjwW2kHL9MCCbenoovt1KrEEeP1zYyvlg1AGUdITKYU5fgyjIjDC9dugBjqzAlpX5y97qktHnCZ4a0%2FKZl9Qv%2BQnt1oBgWt9GgKyjm49YnPIxSWc18lFy1gnxIqORTVD3XErgPP6ouJoqxBVGA6ukEXOdEsf6dPgSVI8J2mB67twcjUoFYHAGUrAbbXEUDCDjn%2BQD6rP91%2B5Bf9jB6sKbHGgkzCKfxXQ5w30OzldG34g78sX5YCtS0JlR4OgJLGlTK2egXYxYftdHSUKCtH8D%2Bpkbq4JV6az76RSOiQ97nZQIIWHLm5YBlbNbLjHBduWXy4p4KZXPFigSRdoPG9vucYpkJ9FZiUA1A90MyFHaSYl6474OwvrHTr8XqpdPxUk4Fg4PM3Fq3uh6BnSeRa32Gqit35KSVpuJBygI%2BZTW75Q2x1P19Q6J4NE2a38v7g6fB2H5bbRLDbOajatYbKNnC0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230319T165412Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA26EMDZ35BQHUVZHD%2F20230319%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=6e579571cc0bdef32ec54041ecc57dd3fc1b1434b54e99a05642e9ce76db3d9b', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Akarmi', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'akarmi@gmail.com', 'https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/1b17f479bdf961a801080529df03b46be69ccfbf18ca4a5c69d0152f3bcbed5e?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJHMEUCIQCQn4PFKw3%2BnBE65HbhChc%2BudD5LjR5WZZmZBYhbScFWQIgPsgf4ouUtByHelXlETv42tYsorwKEfxu57RP6ath7QYq5AIIXRAAGgw3NTE5MTMxMjc2NzQiDNhdc339vbS%2BCU2n3irBAtxP2O3GxU3kvODxU%2FnzrKf0UboQ8bFU8uz1MwTWEmTeVS6Q5oNJ43sNOTF2chIOGQaJU3IqT55NF5VVa%2F9JqWdKM69Ef6Smu%2BnXaIAh6UBI3vWkafoguSCdjurSjlfdVDdppruxGEmrWWNupDwqVjB6X%2F37%2FLkkF3qllKFQyAwRg%2F3U48EV%2BDwyV8WEN2pA6ijJiPEV2zNuCjy44idmBpIaRJtEgBLZFtTiOhbN%2Fodiv7Ua6WBcn6CHguZ2OZmIdqFS0LMPVNAS5cJskgmXq%2F9VF08L9FC3tpin1isiYhh%2F2uZLwGOxP%2BZP9fHGjkPH%2F6VFNTYgC3rgX7iu2jRS7%2BwxEKNZJqBxZQcBJOLW6vtjW%2Fgke9dHzqf6TtCbYjwW2kHL9MCCbenoovt1KrEEeP1zYyvlg1AGUdITKYU5fgyjIjDC9dugBjqzAlpX5y97qktHnCZ4a0%2FKZl9Qv%2BQnt1oBgWt9GgKyjm49YnPIxSWc18lFy1gnxIqORTVD3XErgPP6ouJoqxBVGA6ukEXOdEsf6dPgSVI8J2mB67twcjUoFYHAGUrAbbXEUDCDjn%2BQD6rP91%2B5Bf9jB6sKbHGgkzCKfxXQ5w30OzldG34g78sX5YCtS0JlR4OgJLGlTK2egXYxYftdHSUKCtH8D%2Bpkbq4JV6az76RSOiQ97nZQIIWHLm5YBlbNbLjHBduWXy4p4KZXPFigSRdoPG9vucYpkJ9FZiUA1A90MyFHaSYl6474OwvrHTr8XqpdPxUk4Fg4PM3Fq3uh6BnSeRa32Gqit35KSVpuJBygI%2BZTW75Q2x1P19Q6J4NE2a38v7g6fB2H5bbRLDbOajatYbKNnC0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230319T165412Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA26EMDZ35BQHUVZHD%2F20230319%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=6e579571cc0bdef32ec54041ecc57dd3fc1b1434b54e99a05642e9ce76db3d9b', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Valami', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'valami@gmail.com', 'https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/1b17f479bdf961a801080529df03b46be69ccfbf18ca4a5c69d0152f3bcbed5e?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJHMEUCIQCQn4PFKw3%2BnBE65HbhChc%2BudD5LjR5WZZmZBYhbScFWQIgPsgf4ouUtByHelXlETv42tYsorwKEfxu57RP6ath7QYq5AIIXRAAGgw3NTE5MTMxMjc2NzQiDNhdc339vbS%2BCU2n3irBAtxP2O3GxU3kvODxU%2FnzrKf0UboQ8bFU8uz1MwTWEmTeVS6Q5oNJ43sNOTF2chIOGQaJU3IqT55NF5VVa%2F9JqWdKM69Ef6Smu%2BnXaIAh6UBI3vWkafoguSCdjurSjlfdVDdppruxGEmrWWNupDwqVjB6X%2F37%2FLkkF3qllKFQyAwRg%2F3U48EV%2BDwyV8WEN2pA6ijJiPEV2zNuCjy44idmBpIaRJtEgBLZFtTiOhbN%2Fodiv7Ua6WBcn6CHguZ2OZmIdqFS0LMPVNAS5cJskgmXq%2F9VF08L9FC3tpin1isiYhh%2F2uZLwGOxP%2BZP9fHGjkPH%2F6VFNTYgC3rgX7iu2jRS7%2BwxEKNZJqBxZQcBJOLW6vtjW%2Fgke9dHzqf6TtCbYjwW2kHL9MCCbenoovt1KrEEeP1zYyvlg1AGUdITKYU5fgyjIjDC9dugBjqzAlpX5y97qktHnCZ4a0%2FKZl9Qv%2BQnt1oBgWt9GgKyjm49YnPIxSWc18lFy1gnxIqORTVD3XErgPP6ouJoqxBVGA6ukEXOdEsf6dPgSVI8J2mB67twcjUoFYHAGUrAbbXEUDCDjn%2BQD6rP91%2B5Bf9jB6sKbHGgkzCKfxXQ5w30OzldG34g78sX5YCtS0JlR4OgJLGlTK2egXYxYftdHSUKCtH8D%2Bpkbq4JV6az76RSOiQ97nZQIIWHLm5YBlbNbLjHBduWXy4p4KZXPFigSRdoPG9vucYpkJ9FZiUA1A90MyFHaSYl6474OwvrHTr8XqpdPxUk4Fg4PM3Fq3uh6BnSeRa32Gqit35KSVpuJBygI%2BZTW75Q2x1P19Q6J4NE2a38v7g6fB2H5bbRLDbOajatYbKNnC0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230319T165412Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA26EMDZ35BQHUVZHD%2F20230319%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=6e579571cc0bdef32ec54041ecc57dd3fc1b1434b54e99a05642e9ce76db3d9b', current_date);

INSERT INTO friends (user_id, friend_id)
    VALUES  (1, 3);