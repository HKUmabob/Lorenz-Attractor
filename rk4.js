function calculateRk4(position, p, s, b, h) {

	let preX = position.x;
	let preY = position.y;
	let preZ = position.z;

	let k1x = s * (preY - preX);
    let k1y = preX * (p - preZ) - preY;
    let k1z = preX * preY - b * preZ;

	let h2 = h / 2;
    let x2 = preX + k1x * h2;
    let y2 = preY + k1y * h2;
    let z2 = preZ + k1z * h2;
    let k2x = s * (y2 - x2);
    let k2y = x2 * (p - z2) - y2;
    let k2z = x2 * y2 - b * z2;

    // k3
    let x3 = preX + k2x * h2;
    let y3 = preY + k2y * h2;
    let z3 = preZ + k2z * h2;
    let k3x = s * (y3 - x3);
    let k3y = x3 * (p - z3) - y3;
    let k3z = x3 * y3 - b * z3;

    // k4
    let x4 = preX + k3x * h;
    let y4 = preY + k3y * h;
    let z4 = preZ + k3z * h;
    let k4x = s * (y4 - x4);
    let k4y = x4 * (p - z4) - y4;
    let k4z = x4 * y4 - b * z4;

	let nextX = preX + (h / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
	let nextY = preY + (h / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
	let nextZ = preZ + (h / 6) * (k1z + 2 * k2z + 2 * k3z + k4z);

	position.set(nextX, nextY, nextZ);
    return dist(preX, preY, preZ, position.x, position.y, position.z);
}