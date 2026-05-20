function calculateRk4(pos, s, p, b, h) {
    const getDx = (x, y) => s * (y - x);
    const getDy = (x, y, z) => x * (p - z) - y;
    const getDz = (x, y, z) => x * y - b * z;

	let preY = pos.y;
	let preZ = pos.z;
	let preX = pos.x;

	let k1x = getDx(preX, preY);
	let k1y = getDy(preX, preY, preZ);
	let k1z = getDz(preX, preY, preZ);

	let k2x = getDx(preX + k1x * (h / 2), preY + k1y * (h / 2));
	let k2y = getDy(preX + k1x * (h / 2), preY + k1y * (h / 2), preZ + k1z * (h / 2));
	let k2z = getDz(preX + k1x * (h / 2), preY + k1y * (h / 2), preZ + k1z * (h / 2));

	let k3x = getDx(preX + k2x * (h / 2), preY + k2y * (h / 2));
	let k3y = getDy(preX + k2x * (h / 2), preY + k2y * (h / 2), preZ + k2z * (h / 2));
	let k3z = getDz(preX + k2x * (h / 2), preY + k2y * (h / 2), preZ + k2z * (h / 2));

	let k4x = getDx(preX + k3x * h, preY + k3y * h);
	let k4y = getDy(preX + k3x * h, preY + k3y * h, preZ + k3z * h);
	let k4z = getDz(preX + k3x * h, preY + k3y * h, preZ + k3z * h);

	let nextX = preX + (h / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
	let nextY = preY + (h / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
	let nextZ = preZ + (h / 6) * (k1z + 2 * k2z + 2 * k3z + k4z);

	return createVector(nextX, nextY, nextZ);

}