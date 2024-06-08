function Card({children}){
    return <div className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow font-semibold text-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex-col justify-between space-y-20">
            {children}
        </div>

    </div>
}

export default Card;