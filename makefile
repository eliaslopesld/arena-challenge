start-application:
	docker compose up --build

finish-application:
	docker compose down

run-tests:
	npm run test

run-k6:
	npm run test:performance