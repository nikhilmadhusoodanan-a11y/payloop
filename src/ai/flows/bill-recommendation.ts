'use server';

/**
 * @fileOverview Recommends bill split configurations based on user history and members involved.
 *
 * - recommendBillSplit - A function that handles the bill split recommendation process.
 * - RecommendBillSplitInput - The input type for the recommendBillSplit function.
 * - RecommendBillSplitOutput - The return type for the recommendBillSplit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendBillSplitInputSchema = z.object({
  userId: z.string().describe('The ID of the user creating the bill.'),
  memberIds: z.array(z.string()).describe('The IDs of the members involved in the bill split.'),
  pastSplits: z.array(z.object({
    memberIds: z.array(z.string()),
    threshold: z.number().optional(),
    bounty: z.number().optional(),
  })).describe('The past split history of the user.'),
  currentBillAmount: z.number().describe('The amount of the current bill.'),
});
export type RecommendBillSplitInput = z.infer<typeof RecommendBillSplitInputSchema>;

const RecommendBillSplitOutputSchema = z.object({
  threshold: z.number().describe('The recommended threshold for the bill split.'),
  bounty: z.number().describe('The recommended bounty for faster split settlement.'),
  reasoning: z.string().describe('The reasoning behind the recommendations.'),
});
export type RecommendBillSplitOutput = z.infer<typeof RecommendBillSplitOutputSchema>;

export async function recommendBillSplit(input: RecommendBillSplitInput): Promise<RecommendBillSplitOutput> {
  return recommendBillSplitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendBillSplitPrompt',
  input: {schema: RecommendBillSplitInputSchema},
  output: {schema: RecommendBillSplitOutputSchema},
  prompt: `You are an expert in bill splitting optimization.

  Based on the user's past split history and the members involved, you will recommend a threshold and bounty for the current bill split.

  Consider the following factors when making your recommendations:
  - The user's past split history: What thresholds and bounties have they used in the past? How quickly were those splits settled?
  - The members involved: Are there any members who have a history of slow payments? Are there any members who are particularly responsive?
  - The current bill amount: Is the bill amount high or low? This may influence the threshold and bounty that you recommend.

  Here is the user's past split history:
  {{#each pastSplits}}
  - Members: {{memberIds}}, Threshold: {{threshold}}, Bounty: {{bounty}}
  {{/each}}

  Here are the member IDs involved in the current bill split: {{memberIds}}
  The current bill amount is: {{currentBillAmount}}

  Reason step by step, then provide the threshold, bounty, and reasoning in the output schema.
  `,
});

const recommendBillSplitFlow = ai.defineFlow(
  {
    name: 'recommendBillSplitFlow',
    inputSchema: RecommendBillSplitInputSchema,
    outputSchema: RecommendBillSplitOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
