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

	await prisma.user.delete({
		where: {id: session.user.id},
	});

	return {success: true};
});
