FROM oven/bun
RUN mkdir -p /buny
WORKDIR /buny

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .

EXPOSE 4000
EXPOSE 4500

CMD ["bun", "run", "prod"]
CMD ["bun", "server.ts"]
