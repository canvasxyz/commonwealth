 \COPY (SELECT * FROM "ChainNodes" LIMIT 200) TO 'ChainNodes.csv' WITH (delimiter ',', format CSV);
 \COPY (SELECT * FROM "ChatChannels" LIMIT 200) TO 'ChatChannels.csv' WITH (delimiter ',', format CSV);