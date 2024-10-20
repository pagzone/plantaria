import { useState } from "react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { commentFormSchema, CommentFormSchema, ReplyFormSchema, replyFormSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "../ui/scroll-area";

interface Reply {
    id: number;
    username: string;
    profileImage: string;
    text: string;
    timestamp: string;
    createdAt: string;
    updatedAt: string | null;
}

interface Comment {
    id: number;
    username: string;
    profileImage: string;
    text: string;
    timestamp: string;
    createdAt: string;
    updatedAt: string | null;
    replies: Reply[];
}

// Simulating the current logged-in user
const currentUser = "JohnDoe";

const CommentArea = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
    const [editCommentId, setEditCommentId] = useState<number | null>(null);
    const [editReplyId, setEditReplyId] = useState<number | null>(null);
    const [editedComment, setEditedComment] = useState<string>("");
    const [viewReplies, setViewReplies] = useState(false);

    const commentForm = useForm<z.infer<typeof commentFormSchema>>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: {
            comment: "",
        },
    });

    const replyForm = useForm<z.infer<typeof replyFormSchema>>({
        resolver: zodResolver(replyFormSchema),
        defaultValues: {
            newReply: "",
        },
    });

    const formatDate = (date: Date) => {
        return date.toLocaleString();
    };

    const onCommentSubmit = (values: z.infer<CommentFormSchema>) => {
        const newComment: Comment = {
            id: Date.now(),
            username: currentUser, // Current user
            profileImage: "/path/to/profile.jpg",
            text: values.comment,
            createdAt: formatDate(new Date()),
            updatedAt: null, // Initially null
            timestamp: new Date().toISOString(),
            replies: [],
        };
        setComments((prev) => [...prev, newComment]);
        commentForm.reset();
    };

    const onReplySubmit = (values: z.infer<ReplyFormSchema>) => {
        if (replyToCommentId) {
            const newReply: Reply = {
                id: Date.now(),
                username: currentUser, // Current user
                profileImage: "/path/to/profile.jpg",
                text: values.newReply,
                createdAt: formatDate(new Date()),
                updatedAt: null, // Initially null
                timestamp: new Date().toISOString(),
            };

            const updatedComments = comments.map((comment) => {
                if (comment.id === replyToCommentId) {
                    return { ...comment, replies: [...comment.replies, newReply] };
                }
                return comment;
            });

            setComments(updatedComments);
            replyForm.reset();
            setReplyToCommentId(null);
            setViewReplies(true);
        }
    };

    const editComment = (commentId: number, newText: string) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                return { ...comment, text: newText, updatedAt: formatDate(new Date()) }; 
            }
            return comment;
        });
        setComments(updatedComments);
        setEditCommentId(null);
    };

    const editReply = (commentId: number, replyId: number, newText: string) => {
        if(newText){
            const updatedComments = comments.map((comment) => {
                if (comment.id === commentId) {
                    const updatedReplies = comment.replies.map((reply) => {
                        if (reply.id === replyId) {
                            return { ...reply, text: newText, updatedAt: formatDate(new Date()) }; 
                        }
                        return reply;
                    });
                    return { ...comment, replies: updatedReplies };
                }
                return comment;
            });

            setComments(updatedComments);
            setEditReplyId(null);
            setEditedComment('');
        }
    };

    const deleteComment = (commentId: number) => {
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
    };

    const deleteReply = (commentId: number, replyId: number) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                const updatedReplies = comment.replies.filter(reply => reply.id !== replyId);
                return { ...comment, replies: updatedReplies };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    return (
        <div className="flex flex-col gap-y-4 mb-6 border-b px-4 py-4">
            <ScrollArea className="h-48">
                {comments.length > 0 && comments.reverse().map((comment) => (
                    <div
                        key={comment.id}
                        className="p-4 bg-white border rounded-md shadow-sm mb-4">
                        <div className="flex items-center mb-2 gap-x-1 ">
                            <img
                                src={comment.profileImage}
                                alt={`${comment.username} profile`}
                                className="size-10 rounded-full mr-2 bg-slate-400"
                            />
                            <div className="flex flex-col">
                                <span className="font-semibold text-lg">{comment.username}</span>
                                <span className="text-xs text-gray-500">{comment.createdAt}</span>
                            </div>
                        </div>

                        {editCommentId === comment.id ? (
                            <div>
                                <Input
                                    type="text"
                                    defaultValue={comment.text}
                                    onChange={(e) => setEditedComment(e.target.value) }
                                    placeholder="Edit your comment..."
                                    className="p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <Button
                                    onClick={() => editComment(comment.id, editedComment)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={() => setEditCommentId(null)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </Button>

                            </div>
                        ) : (
                            <div className="mb-2 flex flex-col ">
                                <div className="flex flex-col border-b py-1.5 ">
                                    <p className="text-gray-700 ">{comment.text}</p>
                                    {comment.updatedAt && <p className="text-xs text-gray-500">edited: {comment.updatedAt}</p>}
                                </div>

                                <div className="flex items-center justify-between">
                                    {/* Reply Form */}
                                    <div className="flex gap-x-2">
                                        <button onClick={() => setReplyToCommentId(comment.id)} className="text-sm underline cursor-pointer text-blue-600 hover:text-blue-800 mt-1">
                                            Reply
                                        </button>

                                        {comment.username === currentUser && (
                                            <div className="flex justify-start mt-1 gap-x-2 ">
                                                <button onClick={() => setEditCommentId(comment.id)} className="text-sm underline cursor-pointer text-blue-600 hover:text-blue-800">
                                                    Edit
                                                </button>
                                                <button onClick={() => deleteComment(comment.id)} className="text-sm underline cursor-pointer text-red-600 hover:text-red-800">
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <button 
                                       className="text-sm underline cursor-pointer text-blue-600 hover:text-blue-800 mt-1"
                                       onClick={() => setViewReplies(!viewReplies)}
                                    >
                                        {comment.replies.length} {" "} replies
                                    </button>
                                </div>

                                {replyToCommentId === comment.id && (
                                    <div className="mt-2">
                                        <Input
                                            type="text"
                                            placeholder="Write your reply..."
                                            {...replyForm.register("newReply")}
                                            className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        <Button
                                            onClick={replyForm.handleSubmit(onReplySubmit)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                            onClick={() => setReplyToCommentId(null)}
                                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400 transition"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Display Replies */}
                        {viewReplies && comment.replies.length > 0 && (
                            <div className="ml-6 mt-2">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex flex-wrap mb-1  flex-col">
                                    
                                        <div className="flex border-b py-2">
                                            <img
                                                src={reply.profileImage}
                                                alt={`${reply.username} profile`}
                                                className="size-8 rounded-full mr-2"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-sm">{reply.username}</span>
                                                <span className="text-gray-400 text-[0.60rem]">{reply.createdAt}</span>

                                                <p className="text-sm text-slate-600">{reply.text}</p>
                                            </div>
                                        </div>
                                        {editReplyId === reply.id ? (
                                            <div className="flex items-center">
                                                <Input
                                                    type="text"
                                                    defaultValue={reply.text}
                                                    onChange={(e) => replyForm.setValue("newReply", e.target.value)}
                                                    placeholder="Edit your reply..."
                                                    className="p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                                <Button
                                                    onClick={() => editReply(comment.id, reply.id, replyForm.getValues("newReply"))}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    onClick={() => setEditReplyId(null)}
                                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400 transition"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex">
                                                {reply.username === currentUser && (
                                                    <div className="flex justify-start mt-1">
                                                        <button onClick={() => setEditReplyId(reply.id)} className="text-xs underline cursor-pointer text-blue-600 hover:text-blue-800">
                                                            Edit
                                                        </button>
                                                        <button onClick={() => deleteReply(comment.id, reply.id)} className="text-xs underline cursor-pointer text-red-600 hover:text-red-800 ml-2">
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </ScrollArea>

            <Form {...commentForm}>
                <form onSubmit={commentForm.handleSubmit(onCommentSubmit)}>
                    <FormField
                        control={commentForm.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Make a comment..."
                                        {...field}
                                        className="w-full p-3 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CommentArea;