/** @jsx h */
import { h } from "preact";

export function RelatedItem({ item }) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-16">
        <img src={item.full_url_image} alt={item.name} className="max-w-full" />
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 mb-16">
          <div className="text-sm text-gray-500">{item.category}</div>

          <div className="text-gray-900 font-semibold mb-1 whitespace-normal">
            {item.name}
          </div>

          {Boolean(item.reviewScore) && (
            <div className="items-center flex text-sm text-gray-700">
              <svg
                className="mr-4 text-orange-500"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="mr-4">
                {item.reviewScore.toFixed(1) || '--'}
              </span>
              <span className="text-gray-400">
                ({item.reviewCount} reviews)
              </span>
            </div>
          )}

          <div className="my-2 font-semibold text-gray-800">${item.price}</div>
        </div>
        <button
          className="flex items-center content-center relative bg-white border-xenon-600 border-solid border rounded text-xenon-900 cursor-pointer py-4 px-8 font-bold"
          style={{ justifyContent: 'center' }}
          onClick={event => {
            event.preventDefault()
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}