import prisma from "~/lib/prisma";
import {getServerSession} from "#auth";

export default defineEventHandler(async (event) => {
	const session = await getServerSession(event);
	if (!session || !session.user) {
		return createError({
			statusCode: 401,
			message: "Unauthorized",
		});
	}

	const user = await prisma.user.findUnique({
		where: {id: session.user.id},
		select: {
			id: true,
			email: true,
			name: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	if (!user) {
		return createError({
			statusCode: 404,
			message: "User not found",
		});
	}

	return user;
});
