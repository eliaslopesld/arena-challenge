export function ipToId(ip: string): number {
  const parts = ip.split('.').map(Number);

  return parts[0] * 16777216 + parts[1] * 65536 + parts[2] * 256 + parts[3];
}
