FROM oven/bun:1 as base
RUN mkdir -p /buny
WORKDIR /buny

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .

EXPOSE 4000

CMD ["bun", "prod"]
