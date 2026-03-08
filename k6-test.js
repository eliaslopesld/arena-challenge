import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 5 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
  },
};

export default function () {
  const realIPs = [
    '8.8.8.8',
    '1.1.1.1',
    '208.67.222.222',
    '9.9.9.9',
    '8.8.4.4',
    '1.0.0.1',
    '4.2.2.2',
    '198.41.0.4',
    '192.168.0.1',
    '10.0.0.1',
  ];

  realIPs.forEach((ip) => {
    const res = http.get(`http://localhost:3000/ip/location?ip=${ip}`);

    check(res, {
      'status is 200': (r) => r.status === 200,
    });

    check(res, {
      'response time < 200ms': (r) => r.timings.duration < 200,
    });
  });

  const notFoundIps = ['256.256.256.256', '300.300.300.300'];

  notFoundIps.forEach((ip) => {
    const res = http.get(`http://localhost:3000/ip/location?ip=${ip}`);

    check(res, {
      'status is 404': (r) => r.status === 404,
    });

    check(res, {
      'response time < 200ms': (r) => r.timings.duration < 200,
    });
  });
}
