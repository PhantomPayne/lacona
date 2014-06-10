#Includes

	moment = require 'moment'

#Date

	module.exports =
		scope:
			getDate: (result) ->
				if result.relativeDate?
					return moment({hour: 0}).add(result.relativeDate, 'd').toDate()
				else
					return moment().toDate()
		schema: [
			name: 'dayOfTheWeek'
			root:
				type: 'choice'
				id: '@value'
				children: [
					type: 'Sunday'
					value: 0
				,
					type: 'Monday'
					value: 1
				,
					type: 'Tuesday'
					value: 2
				,
					type: 'Wednesday'
					value: 3
				,
					type: 'Thursday'
					value: 4
				,
					type: 'Friday'
					value: 5
				,
					type: 'Saturday'
					value: 6
				]
		,
			name: 'date'
			evaluate: 'getDate'
			root:
				type: 'choice'
				children: [
					type: 'literal'
					id: 'relativeDate'
					display: 'today'
					value: 0
				,
					type: 'literal'
					id: 'relativeDate'
					display: 'tomorrow'
					value: 1
				,
					type: 'literal'
					id: 'relativeDate'
					display: 'the day after tomorrow'
					value: 2
				,
					type: 'sequence'
					children: [
						'in'
					,
						type: 'integer'
						id: 'relativeDate'
					,
						'days'
					]
				]
		]