<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\ShopifyResponser;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class DiscountController extends Controller
{
    use ShopifyResponser;

    public function createDiscount(Request $request)
    {
        try {
            $shop = Auth::user();
            if (!$shop) {
                return $this->unauthorizedResponse();
            }

            $request->validate([
                'type' => 'required|in:percentage,fixed',
                'discount' => 'required|numeric|min:0',
                'title' => 'nullable|string|max:255',
            ]);

            $type = $request->input('type');
            $discount = (float) $request->input('discount');
            $title = $request->input('title') ?: ($type === 'percentage' ? 'Percentage Discount' : 'Fixed Discount');

            $mutation = '
            mutation discountAutomaticBasicCreate($automaticBasicDiscount: DiscountAutomaticBasicInput!) {
                discountAutomaticBasicCreate(automaticBasicDiscount: $automaticBasicDiscount) {
                    automaticDiscountNode {
                        id
                        automaticDiscount {
                            ... on DiscountAutomaticBasic {
                                title
                                startsAt
                                combinesWith {
                                    orderDiscounts
                                }
                                customerGets {
                                    value {
                                        ... on DiscountAmount {
                                            amount{
                                                amount
                                            }
                                        }
                                        ... on DiscountPercentage {
                                            percentage
                                        }
                                    }
                                }
                            }
                        }
                    }
                    userErrors {
                        field
                        code
                        message
                    }
                }
            }
            ';

            $variables = [
                'automaticBasicDiscount' => [
                    'title' => $title,
                    'startsAt' => now()->toIso8601String(),
                    'combinesWith' => [
                        'orderDiscounts' => true,
                    ],
                    'customerGets' => [
                        'value' => $type === 'percentage'
                            ? ['percentage' =>  $discount / 100]
                            : [
                                'discountAmount' => [
                                    'amount' => $discount,
                                    'appliesOnEachItem' => false,
                                ]
                            ],
                        'items' => [
                            'all' => true,
                        ]
                    ],
                ],
            ];

            $response = $shop->api()->graph($mutation, $variables);
            //Log::info('Shopify API Response', ['response' => $response]);
            $result = $response['body']['data']['discountAutomaticBasicCreate'] ?? null;

            if (!empty($result['userErrors']) && count($result['userErrors']) > 0) {
                return $this->errorResponse('Shopify returned errors.', 422, $result['userErrors']);
            }

            return $this->successResponse($result['automaticDiscountNode'], 'Discount created successfully.');

        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while creating the discount.', 500);
        }
    }
}
